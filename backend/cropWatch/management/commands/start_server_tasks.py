from typing import Any
from django.core.management.base import BaseCommand
from cropWatch.predict import main


class  Command(BaseCommand):
    help = 'Run automated tasks when the server starts'

    def handle(self, *args, **options):

        main()

       
