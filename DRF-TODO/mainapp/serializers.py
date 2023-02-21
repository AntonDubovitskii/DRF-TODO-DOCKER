from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from .models import ServiceUser, Project, TODO


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = '__all__'


class ServiceUserModelSerializer(ModelSerializer):

    class Meta:
        model = ServiceUser
        fields = ('id', 'first_name', 'last_name', 'age', 'email', 'project')


class ServiceUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = ServiceUser
        fields = '__all__'


class TODOModelSerializer(ModelSerializer):
    creator = ServiceUserModelSerializer()
    project = ProjectModelSerializer()

    class Meta:
        model = TODO
        fields = '__all__'


class TODOModelSerializerBase(ModelSerializer):
    class Meta:
        model = TODO
        fields = '__all__'

