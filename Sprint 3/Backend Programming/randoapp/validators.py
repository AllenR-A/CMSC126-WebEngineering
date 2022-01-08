from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class CustomValidator():
    def validate(self, password, user=None):
        symbolChar = "[()[\]{\}|\\`~!@#$%^&*_\-+=;:'\",<>./?]"  #Symbols -> [()[]{}|\`~!@#$%^&*_-+=;:'",<>./?]
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                _("The password must contain at least 1 number."),
            )
        if not any(char.isupper() for char in password):
            raise ValidationError(
                _("The password must contain at least 1 capital letter."),
            )
        if not any(char in symbolChar for char in password):
            raise ValidationError(
                _("The password must contain at least 1 symbol."),
            )

    def get_help_text(self):
        return _(
            "This password must contain at least 1 number, 1 capital letter, and a symbol. (in addition to the default requirements like a length of 8)"
        )