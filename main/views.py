from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response
from django.views.decorators.csrf import csrf_protect
import requests
import json
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
        tag(file)
        filename = "/" + filename;
        return render(request, 'captions.html', {'image': filename})
    return redirect('main:home')


@csrf_protect
def urlUpload(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        return render(request, 'captions.html', {'image': url})
    return redirect('main:home')

def tag(file):
       num_results = 3
       url = "https://gateway.watsonplatform.net/visual-recognition-beta/api/v1/tag/recognize"
       filename = "media/" + str(file.name)
       fileobject =  open(filename) 
       payload = {"img_File": fileobject}
       r = requests.post(url, files=payload, auth=('d5464b55-d77e-4e73-b43c-67047f778cca', 'HxdJIHObW3ON'))
       response_object=json.loads(r.text)
       labels=response_object.get('images')[0]['labels']
       return map(lambda l: l['label_name'], labels[:num_results])


