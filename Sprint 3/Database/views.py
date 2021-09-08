from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import Status

# Create your views here.


#Retrieve Upload Status: 0 = Disabled, 1 = Enabled
#Retrieve Ok & Not Ok count
#Retrieve Image
#Retrieve DateTime Deadline (text)
def main_view(request):
    stat = Status.objects.get(pk=1)
    context = {
        'timeleft': stat.timeLeft,
        'ok': stat.ok,
        'notok': stat.notok,
        'uploadstate': stat.uploadState,
        'dbimage': stat.image
    }
    return render(request, 'index.html', context)

def about_view(request):
    return render(request, 'about.html')
    
def contact_view(request):
    return render(request, 'contact.html')

#Increment Ok count & set time deadline (if there's a new deadline) 
def press_ok(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.ok += 1
        stat.timeLeft = request.POST['timeleftin']
        stat.save()
    return redirect("/")

#Increment Not Ok count & set time deadline (if there's a new deadline) 
def press_notok(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.notok += 1
        stat.timeLeft = request.POST['timeleftin']
        stat.save()
    return redirect("/")

#Set/Change Upload State: 0 = Disabled, 1 = Enabled
def uploadset(request):
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        stat.uploadState = request.POST['uploadstate']
        stat.save()
    return redirect("/")

#Upload Image
#Reset Counters to 0 & disable upload
#Set new deadline (default)
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