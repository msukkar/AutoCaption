from django.conf.urls import patterns, include, url
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('main.views',
    url(r'^$', 'home', name='home'),
    url(r'^imageUpload/$', 'imageUpload', name='imageUpload'),
    url(r'^urlUpload/$', 'urlUpload', name='urlUpload'),
    url(r'^submitTags/$', 'submitTags', name='submitTags')
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

