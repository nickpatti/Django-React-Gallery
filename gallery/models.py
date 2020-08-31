from django.db import models
from pathlib import Path


class Image(models.Model):
    images = models.FileField()

    @property
    def title(self):
        if hasattr(self, '_title'):
            return self._title
        """ Derive a title from the original filename """
        # remove extension
        filename = Path(self.data.name).with_suffix('').name
        # convert spacing characters to whitespaces
        name = filename.translate(str.maketrans('_', ' '))
        # return with first letter caps
        return name.title()

    @title.setter
    def title(self, name):
        self._title = name


class Album(models.Model):
    title = models.CharField(max_length=100)
    images = models.ManyToManyField(Image, blank=True, related_name='image_albums')
