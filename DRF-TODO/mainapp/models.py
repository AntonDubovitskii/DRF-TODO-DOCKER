from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from uuid import uuid4


class Project(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project_name = models.CharField(max_length=64, unique=True, verbose_name="Project name")
    repo_link = models.CharField(max_length=64, unique=True, verbose_name="Repository link")


class ServiceUser(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    age = models.PositiveIntegerField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    email = models.CharField(max_length=256, unique=True)
    project = models.ForeignKey(Project, null=True, on_delete=models.SET_NULL)


class TODO(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=64, verbose_name="Task")
    description = models.TextField(verbose_name="Description", blank=True, null=True)
    creator = models.ForeignKey(ServiceUser, null=True, on_delete=models.SET_NULL)
    created_date = models.DateTimeField(null=True, auto_now_add=True, verbose_name="Created", editable=False)
    active = models.BooleanField(default=True)
