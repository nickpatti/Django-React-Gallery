from django.shortcuts import render


def index(request):
    return render(request, 'frontend/home.html')


def login(request):
    return render(request, 'frontend/login.html')



