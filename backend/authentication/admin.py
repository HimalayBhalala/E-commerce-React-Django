from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model

User = get_user_model()

# Register your models here.

class UserAdmin(BaseUserAdmin):
    list_display = ["id","email","is_active","is_staff","is_superuser"]
    list_display_links = ["id","email"]
    list_filter = ["is_active","is_staff"]
    fieldsets = (
        ("User Information",{
            "fields":("email","password")
        }),
        ("Personal Information",{
            "fields":("first_name","last_name")
        }),
        ("Groups and Permissions",{
            "fields":("groups","user_permissions")
        }),
        ("Admin and User",{
            "fields":("is_active","is_staff","is_superuser")
        }),
        ("Joined Information",{
            "fields":("date_joined","last_login")
        })
    )
    add_fieldsets = (
        (None,{
            "classes":("wide",),
            "fields":("email","password1","password2")
        }),
    )
    search_fields = ("email",)
    ordering = ("email",)
    readonly_fields = ["date_joined"]

admin.site.register(User,UserAdmin)
