<template>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <meta name="viewport" content="width=device-width" />
      <meta name="generator" content="{Astro.generator}" />
      <title>Home</title>
    </head>
    <body class="bg-neutral-800 text-white overflow-hidden">
      <div class="flex flex-col m-8">
        <h1 class="mb-10 text-4xl self-center">Overview</h1>
        <div class="grid grid-cols-3 gap-10">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </body>
  </html>
</template>
