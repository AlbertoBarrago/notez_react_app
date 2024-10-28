# alBz Personal Notes

🚀 Work in progress, stay tuned.

<span id="countdown"></span>

<script>
  const countdown = document.getElementById("countdown");
  const endDate = new Date(new Date().setDate(new Date().getDate() + 120));

  function updateCountdown() {
    const now = new Date();
    const timeDiff = endDate - now;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    countdown.innerText = `Days remaining: ${daysLeft}`;
  }

  updateCountdown();
  setInterval(updateCountdown, 86400000); // Update daily
</script>