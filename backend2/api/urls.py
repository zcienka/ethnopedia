from . import views

urlpatterns = [
    path('', views.post_list_create_view, name='posts'),
]