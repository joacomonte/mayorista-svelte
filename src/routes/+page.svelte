<script>
  let number = $state(0);
  const sumNumber = () => {
    number += 1;
  }
</script>

<main>
  <h1>hi, your number is {number}</h1>
  <button onclick={sumNumber}>Add</button>
</main>