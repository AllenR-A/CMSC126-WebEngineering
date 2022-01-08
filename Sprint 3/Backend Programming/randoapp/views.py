from django.contrib.auth import authenticate
from django.shortcuts import redirect, render
from django.http import HttpResponse
from .models import Status
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login, logout
from django.contrib import messages
from . forms import RegisterForm, LoginForm

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
        'dbimage': stat.image,
        #'inactive':stat.inactive
    }
    return render(request, 'index.html', context)

def about_view(request):
    #stat = Status.objects.get(pk=1)
    #context = {
    #    'inactive':stat.inactive
    #}
    return render(request, 'about.html')#, context)

def contact_view(request):
    #stat = Status.objects.get(pk=1)
    #context = {
    #    'inactive':stat.inactive
    #}
    return render(request, 'contact.html')#, context)

#Register/Log-In ====================================================
def signup(request):
    form = RegisterForm()
    stat = Status.objects.get(pk=1)
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            user = form.cleaned_data.get('username')
            messages.success(request, user + ' successfully registered.')
            return redirect('/login/')
    context = {
        'form': form,
        #'inactive':stat.inactive
    }
    return render(request, 'signup.html', context)

def login_view(request):
    form = LoginForm()
    #stat = Status.objects.get(pk=1)
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request, username + ' successfully logged in.')
            return redirect('/')

    context = {
        'form': form,
        #'inactive':stat.inactive
    }
    return render(request, 'login.html', context)

def logout_view(request):
    logout(request)
    #stat = Status.objects.get(pk=1)
    #context = {
    #    'inactive':stat.inactive
    #}
    if request.method == "POST":
        #stat.inactive = 0
        #stat.save()
        return redirect('/')
    else:
        return render(request, 'logout.html')#, context)

#Reset inactive state and load main page like usual
#def logouttohome(request):
    #stat = Status.objects.get(pk=1)
    #if request.method == "POST":
        #stat.inactive = 0
        #stat.save()
        #return redirect('/')

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