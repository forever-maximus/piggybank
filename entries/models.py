from django.db import models

class Entry(models.Model):
    ONE_OFF = 'One-Off'
    WEEKLY = 'Weekly'
    FORTNIGHTLY = 'Fortnightly'
    MONTHLY = 'Monthly'
    QUARTERLY = 'Quarterly'
    HALF_YEARLY = 'Half-Yearly'
    YEARLY = 'Yearly'
    frequency_choices = (
        (ONE_OFF, 'One-Off'),
        (WEEKLY, 'Weekly'),
        (FORTNIGHTLY, 'Fortnightly'),
        (MONTHLY, 'Monthly'),
        (QUARTERLY, 'Quarterly'),
        (HALF_YEARLY, 'Half-Yearly'),
        (YEARLY, 'Yearly'),
    )

    name = models.CharField(max_length=200)
    amount = models.DecimalField(max_digits=11, decimal_places=2)
    start_date = models.DateField('start date')
    end_date = models.DateField('end date', null=True, blank=True)
    frequency = models.CharField(choices=frequency_choices, max_length=20)
    owner = models.ForeignKey('auth.User', related_name='entries', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
