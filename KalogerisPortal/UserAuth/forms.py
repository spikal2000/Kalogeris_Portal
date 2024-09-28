from django import forms
from django.contrib.auth.models import User
from Main.models import Employee, Branch

class RegisterForm(forms.ModelForm):
    username = forms.CharField(max_length=150, required=True, help_text='Required. 150 characters or fewer.')
    email = forms.EmailField(required=True, max_length=254, help_text='Required. Inform a valid email address.')
    password = forms.CharField(widget=forms.PasswordInput(), help_text='Enter a strong password.')
    confirm_password = forms.CharField(widget=forms.PasswordInput(), help_text='Confirm your password.')
    
    # Employee fields
    name = forms.CharField(max_length=100, required=True, help_text='Enter your first name.')
    surname = forms.CharField(max_length=100, required=True, help_text='Enter your last name.')
    date_of_joining = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}), help_text='Select your joining date.')
    IBAN = forms.CharField(max_length=100, required=False, help_text='Enter the IBAN.')
    branch = forms.ModelChoiceField(
        queryset=Branch.objects.all(),
        required=True,
        help_text='Select your branch.',
        to_field_name="name",  # Use the name field for choices
        label="Branch"
    )
    salary = forms.DecimalField(max_digits=10, decimal_places=2, required=False, help_text='Enter your total salary.')
    totalSalary = forms.DecimalField(max_digits=10, decimal_places=2, required=False, help_text='Enter your total salary(plus extras).')

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'name', 'surname', 'date_of_joining', 'salary', 'totalSalary',  'branch']

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")

        if password != confirm_password:
            raise forms.ValidationError("Passwords do not match")

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
            salary=self.cleaned_data['salary']
            totalSalary=self.cleaned_data['totalSalary']
            if salary == None:
                salary=0
            if totalSalary == None:
                totalSalary=0
            
            # Create and save the Employee instance
            employee = Employee(
                user_id=user,
                name=self.cleaned_data['name'],
                Surname=self.cleaned_data['surname'],
                date_of_joining=self.cleaned_data['date_of_joining'],
                branch=self.cleaned_data['branch'],
                salary=salary,
                totalSalary=totalSalary 
                
            )
            employee.save()

        return user
    

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'is_superuser']
        widgets = {
            'is_superuser': forms.CheckboxInput(),
        }

    password = forms.CharField(widget=forms.PasswordInput(), required=False)

    def save(self, commit=True):
        user = super().save(commit=False)
        if self.cleaned_data['password']:
            user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user