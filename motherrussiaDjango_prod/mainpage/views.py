from django.shortcuts import render
from .models import GameMode
from .models import GameModeClassic
from django.shortcuts import render, redirect
from django.contrib import auth
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import datetime


def mainpage(request):
    game_modes = GameMode.objects.all()
    game_modes_classic = GameModeClassic.objects
    return render(
        request,
        'index.html',
        {"game_modes": game_modes, "kremlins": game_modes_classic.get(name='kremlins').likes_count,
         "ring": game_modes_classic.get(name='ring').likes_count,
         "explorer": game_modes_classic.get(name='explorer_mode').likes_count,
         "bridges": game_modes_classic.get(name='bridges').likes_count,
         "secret": game_modes_classic.get(name='secret').likes_count},
    )


def create_new_map(request):
    url_from = request.META['HTTP_REFERER']
    if request.method == "POST":
        new_game_mode = GameMode(
            name=request.POST.get("name"),
            author=request.POST.get("author"),
            description=request.POST.get("description"),
            locations=request.POST.get("locations"),
            locations_count=request.POST.get("locations_count"),
            likes_count=0,
            rating=5,
        )
        new_game_mode.save()
        return redirect(url_from)


def start_game(request, game_mode_id):
    game_mode = GameMode.objects.get(id=game_mode_id)
    return render(request, 'game.html', {"game_mode": game_mode})


def start_game_explorer_mode(request):
    return render(request, 'explorer_mode.html')


def start_game_bridges(request):
    return render(request, 'bridges.html')


def start_game_secret(request):
    return render(request, 'secret.html')


def start_game_ring(request):
    return render(request, 'ring.html')


def start_game_kremlins(request):
    return render(request, 'kremlins.html')


def endgame(request):
    return render(request, 'endgame.html')


def setresults(request):
    like = request.POST.get("like")
    name = request.POST.get("name")
    if GameModeClassic.objects.filter(name=name).first():
        game_mode = GameModeClassic.objects.get(name=name)
    else:
        game_mode = GameMode.objects.filter(name=name).first()
    if like == "on":
        game_mode.likes_count += 1
        game_mode.save()
    return redirect('http://mother-russia.fun/')
