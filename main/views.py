from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response
from django.views.decorators.csrf import csrf_protect

def home(request):
    return render(request, 'index.html')

@csrf_protect
def imageUpload(request):
    if request.method == 'POST':
        file = request.FILES['file']
        filename = "static/AutoCaption/css/media/" + str(file.name)
        with open(filename, 'wb') as dest:
            for chunk in file.chunks():
                dest.write(chunk)
        return render(request, 'captions.html', {'image': filename})
    return redirect('main:home')


@csrf_protect
def urlUpload(request):
    if request.method == 'POST':
        url = request.POST.get('url')
        print(url)
        return render(request, 'captions.html', {'image': url})
    return redirect('main:home')
