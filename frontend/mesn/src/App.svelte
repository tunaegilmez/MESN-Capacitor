<script>
  let users = [];

  let name;
  let surname;

  const addUser = async () => {
    let bodyData = {
      name,
      surname,
    };
    const res = await fetch("http://localhost:3000/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const json = await res.json();
    console.log(json);
    getUsers();
  };

  const getUsers = async () => {
    const res = await fetch("http://localhost:3000/users");

    const json = await res.json();
    console.log(json);
    users = json["users"];
  };

  getUsers();
</script>

<main>
  <h1>MESN</h1>
  <hr />
  <input type="text" placeholder="Name" bind:value={name} />
  <input type="text" placeholder="Surname" bind:value={surname} />
  <button on:click={addUser}>Add User</button>
  <hr />
  <h3>Users List</h3>

  <div class="table">
    <table>
      <thead>
        <tr>
          <td>User ID</td>
          <td>Name</td>
          <td>Surname</td>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
          <tr>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.surname}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 100%;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  div.table {
    text-align: center;
  }

  table {
    width: 100%;
  }

  td {
    border: 1px solid black;
    padding: 5px;
  }
</style>
