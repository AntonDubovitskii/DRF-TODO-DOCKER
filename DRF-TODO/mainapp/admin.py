from django.contrib import admin
from .models import TODO, ServiceUser, Project

admin.site.register(TODO)
admin.site.register(Project)
admin.site.register(ServiceUser)
