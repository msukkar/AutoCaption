from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response
from django.views.decorators.csrf import csrf_protect
import requests
import json
import urllib
import random
from django.conf import settings

def home(request):
    return render(request, 'index.html')

@csrf_protect
def imageUpload(request):
    if request.method == 'POST':
        file = request.FILES['file']
        filename = str("static/AutoCaption/css/media/" + file.name)
        try:
            with open(filename, 'wb') as dest:
                for chunk in file.chunks():
                    dest.write(chunk)
        except Exception, e:
            print type(e.reason)
        tags = tag(filename)
        filename = "/" + filename;
        return render(request, 'captions.html', {'image': filename, 'tags': tags})
    return redirect('main:home')


@csrf_protect
def urlUpload(request):
    if request.method == 'POST':
        r=random.random()
        url = request.POST.get('url')
        try:
            file = urllib.URLopener()
        except Exception, e:
            print type(e.reason)
        filename = "static/AutoCaption/css/media/temp"+str(r)+".jpg"
        file.retrieve(url, filename)
        tags = tag(filename)
        print tags
        filename = "/" +filename
        return render(request, 'captions.html', {'image': filename, 'tags':tags})
    return redirect('main:home')

def tag(filename):
       num_results = 3
       url = "https://gateway.watsonplatform.net/visual-recognition-beta/api/v1/tag/recognize"
       fileobject =  open(filename) 
       payload = {"img_File": fileobject}
       r = requests.post(url, files=payload, auth=('d5464b55-d77e-4e73-b43c-67047f778cca', 'HxdJIHObW3ON'))
       response_object=json.loads(r.text)
       labels=response_object.get('images')[0]['labels']
       return map(lambda l: l['label_name'], labels[:num_results])

def submitTags(req):
    url="https://search-autocaptioner2-mt53ysx27b6wvyfayjynpq6odu.us-east-1.cloudsearch.amazonaws.com/2013-01-01/search?q=golf&size=10"
    keywords=""
    if req.is_ajax():
        if req.method == 'POST':
            j=json.loads(requests.get(url).text)
            m = map(lambda l: l['fields']['quote'], j['hits']['hit']) 
    return render(request, 'captions.html', {"captions": m, "image:" filename})