import { Component, Host, State, h } from '@stencil/core';
import { userService } from '../../services/UserService';
import { initFormValue } from '../../utils/utils';

@Component({
  tag: 'crud-table',
  styleUrl: 'crud-table.css',
  shadow: true,
})
export class CrudTable {
  @State() data: any[] = [];

  @State() form: any = initFormValue;
  @State() isButtonDisabled: boolean = true;
  @State() loading: boolean = false;

  private save = async e => {
    e.preventDefault();
    this.loading = true;
    if (!this.form.id) {
      await userService.createUser(this.form, this.onCompleteAPICallback);
    } else {
      await userService.updateUser(this.form.id, this.form, this.onCompleteAPICallback);
    }
    this.form = initFormValue;
    this.isButtonDisabled = true;
  };

  private onCompleteAPICallback = (data, error) => {
    this.loading = false;
    this.data = data;
    if (error) {
      window.alert(error);
    }
  };

  private onDelete = async id => {
    this.loading = true;
    await userService.deleteUser(id, this.onCompleteAPICallback);
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

  async componentWillLoad() {
    this.data = await userService.getUsers();
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
            {this.loading ? <div class="lds-hourglass"></div> : 'Save'}
          </button>
        </form>
      </Host>
    );
  }
}
