from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response, HttpResponse
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
        filename = "/" +filename
        return render(request, 'captions.html', {'image': filename, 'tags':tags})
    return redirect('main:home')

def tag(filename):
       num_results = 4
       watson_url = "https://gateway.watsonplatform.net/visual-recognition-beta/api/v1/tag/recognize"
       imagga_url="https://api.imagga.com/v1/tagging?url=http://www.autocaption.co/"+filename
       fileobject =  open(filename) 
       print filename
       payload = {"img_File": fileobject}
       r = requests.post(watson_url, files=payload, auth=('d5464b55-d77e-4e73-b43c-67047f778cca', 'HxdJIHObW3ON'))
       r_imagga = requests.get(imagga_url, headers={"Authorization":"Basic YWNjX2FhMTFiMTFhZWQ5Zjk4NjpkMjY0NmQxZjVjZDY4YjE2YjNmMTQ5ZWZiODlkODcxNQ=="})
       imagga_response_object = json.loads(r_imagga.text)
       response_object=json.loads(r.text)
       labels=response_object.get('images')[0]['labels']
       imagga_labels = ""
       if len(imagga_response_object.get('results'))>0:
        imagga_labels=imagga_response_object.get('results')[0]['tags']
       results=map(lambda l: l['label_name'], labels[:num_results/2])
       imagga_results = map(lambda l: l['tag'].title(), imagga_labels[:num_results/2])
       return list(set(results) | set(imagga_results))

def submitTags(req):
    url="https://search-autocaptioner2-mt53ysx27b6wvyfayjynpq6odu.us-east-1.cloudsearch.amazonaws.com/2013-01-01/search?size=10&q="
    keywords=""
    print req
    if req.is_ajax():
    	print "We're ajaxing it up"
        if req.method == 'POST':
            body_json=json.loads(req.body)
            keywords=' | '.join(body_json['tags'])
            url=url+keywords
            j=json.loads(requests.get(url).text)
            m = map(lambda l: l['fields']['quote'], j['hits']['hit'])
            # print m
            # return render(req, 'display.html', {'captions': m})
            return HttpResponse(json.dumps([m]))
        return redirect('main:home')
    return redirect('main:home')