let url = 'https://api.ashbyhq.com/posting-api/job-board/airspace-intelligence.com';

if (window.location.pathname === '/careers') {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // Els
      var positionList = $('.roles_list');
      var positionItem = positionList.find('li').clone();

      // Clear the list
      positionList.empty();

      // Sort jobs by title in alphabetical order
      data.jobs.sort((a, b) => a.department.localeCompare(b.department));

      // Loop through each job
      for (var x = 0; x < data.jobs.length; x++) {
        var currentItem = positionItem;
        currentItem.find('a').attr('href', '/careers/role?=' + data.jobs[x].id);
        currentItem.find('[data-title]').text(data.jobs[x].title);
        currentItem.find('[data-location]').text(data.jobs[x].location);
        positionList.append(currentItem.clone());
      }

      // Reveal the list
      positionList.css('opacity', '1');
    })
    .catch((error) => console.error('Error fetching data:', error));
}

if (window.location.pathname === '/careers/role') {
  var jobId = window.location.search.split('=')[1];

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Filter the job by its ID
      let filteredJob = data.jobs.find((job) => job.id === jobId);

      if (filteredJob) {
        console.log('Filtered Job:', filteredJob);

        // Set page title dynamically
        document.title = filteredJob.title + ' | Air Space Intelligence';

        // Update other elements with job details
        let name = $('[data-name]');
        let location = $('[data-location]');
        let type = $('[data-role-type]');
        let detailLink = $('[data-link]');
        let detailHtml = $('[data-html]');

        // Fix of EmploymentType
        function formatEmploymentType(type) {
          return type.replace(/([a-z])([A-Z])/g, '$1 $2');
        }

        // Data
        name.text(filteredJob.title);
        location.text(filteredJob.location);
        type.text(formatEmploymentType(filteredJob.employmentType)); // Apply formatting here
        detailLink.attr('href', filteredJob.jobUrl + '/application'); // Append '/application' here
        detailHtml.html(filteredJob.descriptionHtml);

        // Reveal
        $('.role_wrap').addClass('rendered');
      } else {
        window.location.href = '/careers#roles';
      }
    })
    .catch((error) => console.error('Error fetching data:', error));
}
