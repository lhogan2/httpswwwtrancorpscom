create policy "Staff can read resumes" on storage.objects for select to authenticated
  using (bucket_id = 'resumes' and (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'manager')));

create policy "Admins can delete resumes" on storage.objects for delete to authenticated
  using (bucket_id = 'resumes' and public.has_role(auth.uid(), 'admin'));
