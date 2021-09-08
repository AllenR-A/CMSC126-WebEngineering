from django.db import models

# Create your models here.

class Status(models.Model):
    image = models.ImageField(upload_to="uploaded_image/")
    ok = models.PositiveIntegerField(default=0)
    notok = models.PositiveIntegerField(default=0)
    uploadState = models.PositiveIntegerField(default=0)
    timeLeft = models.TextField(null=True)  #using text field so that "new Date()" in JavaScript would work
