from django.shortcuts import render, HttpResponseRedirect, redirect, render_to_response
from django.views.decorators.csrf import csrf_protect

def home(request):
    return render(request, 'index.html')

@csrf_protect
def imageUpload(request):
    print("Hi")
    if request.method == 'POST':
        file = request.FILES['file']
        filename = "media/" + str(file.name)
        with open(filename, 'wb') as dest:
            for chunk in file.chunks():
                dest.write(chunk)
    return redirect('main:home')
