from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import Status

# Create your views here.
def main_view(request):
    stat = Status.objects.get(pk=1)
    context = {
        'timeleft': stat.timeLeft,
        'ok': stat.ok,
        'notok': stat.notok,
        'uploadstate': stat.uploadState,
        'dbimage': stat.image
    }
    #return HttpResponse('uploadtime?')
    return render(request, 'index.html', context)

def about_view(request):
    #return HttpResponse('uploadtime?')
    return render(request, 'about.html')
    
def contact_view(request):
    #return HttpResponse('uploadtime?')
    return render(request, 'contact.html')

def press_ok(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.ok += 1
        # stat.uploadState = request.POST['uploadstate']
        stat.timeLeft = request.POST['timeleftin']
        stat.save()
    return redirect("/")

def press_notok(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.notok += 1
        # stat.uploadState = request.POST['uploadstate']
        stat.timeLeft = request.POST['timeleftin']
        stat.save()
    return redirect("/")

def uploadset(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.uploadState = request.POST['uploadstate']
        stat.save()
    return redirect("/")

def upload(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.image = request.FILES['imageupload']
        stat.ok = 0
        stat.notok = 0
        stat.uploadState = 0
        stat.timeLeft = request.POST['timeleftin']
        stat.save()
        return redirect("/")
    context = {
        'timeleft': stat.timeLeft,
        'uploadstate': stat.uploadState
    }
    return render(request, 'index.html', context)
    
#To render database info, you have to reload/load an html file everytime