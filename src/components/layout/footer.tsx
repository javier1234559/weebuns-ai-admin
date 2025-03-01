function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center">
      <p className="text-xs text-muted-foreground">
        © {currentYear} Education Portal. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer
