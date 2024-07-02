import { Component, Host, State, h } from '@stencil/core';

@Component({
  tag: 'crud-table',
  styleUrl: 'crud-table.css',
  shadow: true,
})
export class CrudTable {
  @State() data: any[] = [];

  @State() form: any = { name: '', address: '', age: undefined, level: undefined };
  @State() isButtonDisabled: boolean = true;

  private save = e => {
    e.preventDefault();
    if (!this.form.id) {
      this.data = [...this.data, { id: this.data.length + 1, ...this.form }];
    } else {
      this.data = this.data.map(item => (item.id === this.form.id ? { ...item, ...this.form } : item));
    }
    this.form = {};
  };

  private onDelete = id => {
    this.data = this.data?.filter(item => item.id !== id);
  };

  private onEdit = row => {
    this.form = row;
  };

  private updateForm = e => {
    this.form = {
      ...this.form,
      [e.target.name]: e.target.value,
    };
    if (this.form.name && this.form.email && this.form.role) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
  };

  componentWillLoad() {
    return fetch('http://localhost:3300/users')
      .then(response => response.json())
      .then(data => {
        this.data = data;
      });
  }

  render() {
    return (
      <Host>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.data.map(item => (
              <tr class="row">
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button onClick={() => this.onEdit(item)}>Edit</button>
                  <button onClick={() => this.onDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {this.data.length === 0 && <p>No Users Found</p>}
          </tbody>
        </table>
        <form onSubmit={this.save}>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="Name" name="name" onInput={this.updateForm} value={this.form.name} />
          <label htmlFor="email">Email</label>
          <input type="email" placeholder="Email" name="email" onInput={this.updateForm} value={this.form.email} />
          <label htmlFor="role">Role</label>
          <input type="text" placeholder="Role" name="role" onInput={this.updateForm} value={this.form.role} />
          <button disabled={this.isButtonDisabled} class={this.isButtonDisabled ? 'disabled' : ''}>
            Save
          </button>
        </form>
      </Host>
    );
  }
}
