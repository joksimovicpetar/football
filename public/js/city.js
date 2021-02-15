const cities = document.getElementById('cities');

if (cities) {
    cities.addEventListener('click', e => {
    if (e.target.className === 'btn btn-danger delete-city') {
      if (confirm('Are you sure?')) {
        const id = e.target.getAttribute('data-id');

        fetch(`/city/delete/${id}`, {
          method: 'DELETE'
        }).then(res => window.location.reload());
      }
    }
  });
}