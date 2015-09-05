from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response
from django.views.decorators.csrf import csrf_protect
import requests
import json
import urllib
from django.conf import settings

def home(request):
    return render(request, 'index.html')

@csrf_protect
def imageUpload(request):
    if request.method == 'POST':
        file = request.FILES['file']
        filename = str("static/AutoCaption/css/media/" + file.name)
        with open(filename, 'wb') as dest:
            for chunk in file.chunks():
                dest.write(chunk)
        tags = tag(filename)
        filename = "/" + filename;
        return render(request, 'captions.html', {'image': filename, 'tags': tags})
    return redirect('main:home')


@csrf_protect
def urlUpload(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        file = urllib.URLopener()
        filename = "static/AutoCaption/css/media/temp.jpg"
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


