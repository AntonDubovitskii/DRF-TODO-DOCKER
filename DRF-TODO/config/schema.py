import graphene
from graphene_django import DjangoObjectType
from mainapp.models import TODO, Project, ServiceUser


class ServiceUserType(DjangoObjectType):
    class Meta:
        model = ServiceUser
        fields = '__all__'


class TODOType(DjangoObjectType):
    class Meta:
        model = TODO
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TODOType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(ServiceUserType)

    # Нахождение всех карточек с заданиями конкретного проекта по его названию
    todo_by_project_name = graphene.List(TODOType,
                                name=graphene.String(required=False))

    def resolve_all_todo(root, info):
        return TODO.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return ServiceUser.objects.all()

    def resolve_todo_by_project_name(self, info, name=None):
        todo = TODO.objects.all()
        if name:
            todo = todo.filter(project__project_name=name)
        return todo


class TODOMutation(graphene.Mutation):
    class Arguments:
        id = graphene.UUID(required=True)
        project = graphene.UUID()
        title = graphene.String()
        description = graphene.String()
        creator = graphene.UUID()
        create_date = graphene.DateTime(required=False)
        active = graphene.Boolean()

    todo = graphene.Field(TODOType)

    @classmethod
    def mutate(cls, root, info, id, title, description, active):
        todo = TODO.objects.get(pk=id)
        todo.title = title
        todo.description = description
        todo.active = active
        todo.save()
        return TODOMutation(todo=todo)


class Mutation(graphene.ObjectType):
    update_todo = TODOMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

