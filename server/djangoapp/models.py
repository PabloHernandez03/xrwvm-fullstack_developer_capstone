# Uncomment the following imports before adding the Model code

from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class CarMake(models.Model):
    """A car manufacturer. One make has many car models."""
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name


class CarModel(models.Model):
    """A specific model sold by a dealer, belonging to one CarMake."""

    SEDAN = 'SEDAN'
    SUV = 'SUV'
    WAGON = 'WAGON'
    COUPE = 'COUPE'
    HATCHBACK = 'HATCHBACK'

    CAR_TYPES = [
        (SEDAN, 'Sedan'),
        (SUV, 'SUV'),
        (WAGON, 'Wagon'),
        (COUPE, 'Coupe'),
        (HATCHBACK, 'Hatchback'),
    ]

    # Many-To-One: one CarMake has many CarModels
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=10, choices=CAR_TYPES, default=SUV)
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015),
        ],
    )
    # Refers to a dealer stored in the Mongo backend, not a Django FK.
    # Optional on purpose: populate.py creates models without a dealer.
    dealer_id = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.car_make.name + " " + self.name
