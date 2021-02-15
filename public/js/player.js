const players = document.getElementById('players');

if (players) {
    players.addEventListener('click', e => {
    if (e.target.className === 'btn btn-danger delete-player') {
      if (confirm('Are you sure?')) {
        const id = e.target.getAttribute('data-id');

        fetch(`/player/delete/${id}`, {
          method: 'DELETE'
        }).then(res => window.location.reload());
      }
    }
  });
}