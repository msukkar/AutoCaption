from django.conf.urls import patterns, include, url

urlpatterns = patterns('main.views',
    url(r'^$', 'home', name='home'),
    url(r'^imageUpload/$', 'imageUpload', name='imageUpload'),
    url(r'^urlUpload/$', 'urlUpload', name='urlUpload'),
)
