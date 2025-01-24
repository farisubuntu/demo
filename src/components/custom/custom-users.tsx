"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CustomAlertDialog } from "@/components/custom/custom-alert-dialog";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";

export function UserManager() {
  const { data: users, error } = useSWR("/api/users", fetcher);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editId ? `/api/users/${editId}` : "/api/users";
    const method = editId ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (response.ok) {
      mutate("/api/users");
      setName("");
      setEmail("");
      setEditId(null);
    }
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    mutate("/api/users");
  };

  const handleEdit = (user: any) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.user_id);
  };

  if (error) return <div>Failed to load users</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">{editId ? "Update" : "Add"}</Button>
          </form>
          <Table className="mt-6">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(user.user_id)}
                    >
                      Delete
                    </Button>
                    {/* <Button onClick={() => router.replace("/")}>Details</Button> */}
                    <CustomAlertDialog
                      triggerLabel="Details"
                      title="User Details"
                      description={
                        <>
                          <div>
                            This will redirect you to the user details page
                          </div>
                          <p>ID: {user.user_id}</p>
                          <p>Name: {user.name}</p>
                          <p>Email: {user.email}</p>
                        </>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
