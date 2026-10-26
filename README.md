
# ContactBook

A full-stack contact management application built using Django, Django REST Framework, React, and SQLite.

## Features

- Add new contacts
- View all contacts
- Edit existing contacts
- Delete contacts
- REST API integration between React and Django

## Technologies Used

**Backend**
- Python
- Django
- Django REST Framework
- SQLite

**Frontend**
- React
- JavaScript
- HTML
- CSS

## Project Structure

- `contact/` - Django application
- `contacts/` - React frontend
- `manage.py` - Django management script
- `requirements.txt` - Python dependencies

## Run Locally

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd ContactBook
```

### 2. Set up the Python backend

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
python -m pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

Backend API:

http://127.0.0.1:8000/api/contact/

### 3. Set up the React frontend

Open a second terminal:

```bash
cd contacts
npm install
npm start
```

Frontend:

http://localhost:3000

## Notes

- The project uses SQLite for local development.
- React communicates with Django through the REST API.
- Configure CORS in Django settings to allow the local React origin.
- The local database and virtual environment are not included in the repository.
