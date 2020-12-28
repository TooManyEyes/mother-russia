from django.contrib import admin
from django.urls import path
from mainpage import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.mainpage),
    path('create/', views.create_new_map),
    path('game/setresults/', views.setresults),
    path('game/<uuid:game_mode_id>', views.start_game),
    path('game/explorer_mode', views.start_game_explorer_mode),
    path('game/bridges', views.start_game_bridges),
    path('game/secret', views.start_game_secret),
    path('game/ring', views.start_game_ring),
    path('game/kremlins', views.start_game_kremlins),
    path('game/endgame', views.endgame),
]
