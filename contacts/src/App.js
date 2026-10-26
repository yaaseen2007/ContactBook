
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000/api/contact/";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // GET: Load contacts from Django
  async function loadContacts() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load contacts.");
      }

      const data = await response.json();

      setContacts(
        Array.isArray(data) ? data : data.results || []
      );
      setMessage("");
    } catch (error) {
      setMessage(
        "Cannot connect to Django. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  // Update form values when typing
  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  // POST: Add or PUT: Update a contact
  async function handleSubmit(event) {
    event.preventDefault();

    const isEditing = editingId !== null;

    try {
      const response = await fetch(
        isEditing ? `${API_URL}${editingId}/` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      setForm(emptyForm);
      setEditingId(null);
      setMessage(
        isEditing
          ? "Contact updated successfully!"
          : "Contact added successfully!"
      );

      await loadContacts();
    } catch (error) {
      setMessage("Save failed: " + error.message);
    }
  }

  // Load a contact into the form for editing
  function handleEdit(contact) {
    setForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    });

    setEditingId(contact.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // DELETE: Remove a contact
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed.");
      }

      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }

      setMessage("Contact deleted successfully!");
      await loadContacts();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  return (
    <div className="app">
      <header className="header">
        <h1>ContactBook</h1>
        <p>Manage all your contacts in one place.</p>
      </header>

      <main className="container">
        <section className="form-card">
          <h2>
            {editingId !== null ? "Edit Contact" : "Add New Contact"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />

            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="3"
              required
            />

            <button type="submit" className="primary-btn">
              {editingId !== null ? "Update Contact" : "Add Contact"}
            </button>

            {editingId !== null && (
              <button
                type="button"
                className="secondary-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        {message && <p className="message">{message}</p>}

        <section className="contacts-section">
          <h2>My Contacts ({contacts.length})</h2>

          {loading ? (
            <p>Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p>No contacts yet. Add your first contact above.</p>
          ) : (
            <div className="contact-grid">
              {contacts.map((contact) => (
                <article className="contact-card" key={contact.id}>
                  <h3>{contact.name}</h3>
                  <p><strong>Email:</strong> {contact.email}</p>
                  <p><strong>Phone:</strong> {contact.phone}</p>
                  <p><strong>Address:</strong> {contact.address}</p>

                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(contact)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(contact.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
