from django.db import models

# Create your models here.

class Status(models.Model):
    image = models.ImageField(upload_to="uploaded_image/")  #Install Pillow in python to use [.ImageField]
    ok = models.PositiveIntegerField(default=0)
    notok = models.PositiveIntegerField(default=0)
    uploadState = models.PositiveIntegerField(default=0)
    timeLeft = models.TextField(null=True)                  #using text field so that "new Date()" in JavaScript would work

    inactive = models.PositiveIntegerField(default=0)       #currently unused
