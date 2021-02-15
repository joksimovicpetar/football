const clubs = document.getElementById('clubs');

if (clubs) {
    clubs.addEventListener('click', e => {
    if (e.target.className === 'btn btn-danger delete-club') {
      if (confirm('Are you sure?')) {
        const id = e.target.getAttribute('data-id');

        fetch(`/club/delete/${id}`, {
          method: 'DELETE'
        }).then(res => window.location.reload());
      }
    }
  });
}