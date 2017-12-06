from django.db import models

class Entry(models.Model):
    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=11, decimal_places=2)
    start_date = models.DateField('start date')
    end_date = models.DateField('end date', null=True, blank=True)
    frequency = models.CharField(max_length=20)
    cashflow_type = models.CharField(max_length=10)
    category = models.ForeignKey('Category', related_name='entries', on_delete=models.SET_NULL, null=True)
    owner = models.ForeignKey('auth.User', related_name='entries', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=100)
    colour = models.CharField(max_length=100)
    owner = models.ForeignKey('auth.User', related_name='categories', on_delete=models.CASCADE)


    def __str__(self):
        return self.name
