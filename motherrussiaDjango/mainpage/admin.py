from django.contrib import admin
# Register your models here.
from django.contrib import admin

# Register your models here.
from .models import GameMode
from .models import GameModeClassic


admin.site.register(GameMode)
admin.site.register(GameModeClassic)
