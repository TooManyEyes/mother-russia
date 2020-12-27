from django.db import models
import uuid # Required for unique book instances


class GameMode(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="Unique ID")
    name = models.CharField(max_length=200, help_text='Название режима игры')
    author = models.CharField(max_length=200, help_text="Автор")
    description = models.TextField(help_text="Краткое описание режима игры")
    locations = models.TextField(help_text="доступные локации для игры в формате JSON")
    locations_count = models.IntegerField(help_text="Количество локаций для игры НЕ МЕНЯТЬ!")
    likes_count = models.IntegerField(help_text="Сколько юзеров лайкнули локацию НЕ МЕНЯТЬ!")
    rating = models.IntegerField(help_text="Рейтинг режима. НЕ МЕНЯТЬ САМОМУ!")

    def __str__(self):
        """
        String for representing the Model object (in Admin site etc.)
        """
        return self.name


class GameModeClassic(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4,
                          help_text="Unique ID")
    name = models.CharField(max_length=200, help_text='Название режима игры')
    description = models.TextField(help_text="Краткое описание режима игры")
    locations = models.TextField(help_text="доступные локации для игры в формате JSON + их описание")
    locations_count = models.IntegerField(help_text="Количество локаций для игры НЕ МЕНЯТЬ!")
    likes_count = models.IntegerField(help_text="Сколько юзеров лайкнули локацию НЕ МЕНЯТЬ!")
    rating = models.IntegerField(help_text="Рейтинг режима. НЕ МЕНЯТЬ САМОМУ!")

    def __str__(self):
        """
        String for representing the Model object (in Admin site etc.)
        """
        return self.name
