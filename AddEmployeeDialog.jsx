import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQueryClient } from "@tanstack/react-query";

const DEPARTMENTS = ["Reactor Operations", "Safety & Compliance", "Research & Development", "Security", "Engineering", "Administration", "Medical", "Waste Management"];
const CLEARANCE_LEVELS = ["Level 1 - Public", "Level 2 - Internal", "Level 3 - Confidential", "Level 4 - Secret", "Level 5 - Top Secret"];

export default function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    department: "",
    role_title: "",
    clearance_level: "",
    status: "Active",
    email: "",
    hire_date: "",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Employee.create(form);
    queryClient.invalidateQueries({ queryKey: ["employees"] });
    setForm({ employee_id: "", full_name: "", department: "", role_title: "", clearance_level: "", status: "Active", email: "", hire_date: "", notes: "" });
    setOpen(false);
    setSaving(false);
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2">
          <UserPlus className="w-4 h-4" />
          Add Employee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold">Add New Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">EMPLOYEE ID</Label>
              <Input placeholder="CE-0000" value={form.employee_id} onChange={e => update("employee_id", e.target.value)} required />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">FULL NAME</Label>
              <Input placeholder="Full name" value={form.full_name} onChange={e => update("full_name", e.target.value)} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">DEPARTMENT</Label>
              <Select value={form.department} onValueChange={v => update("department", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">ROLE TITLE</Label>
              <Input placeholder="Job title" value={form.role_title} onChange={e => update("role_title", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">CLEARANCE LEVEL</Label>
              <Select value={form.clearance_level} onValueChange={v => update("clearance_level", v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {CLEARANCE_LEVELS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">STATUS</Label>
              <Select value={form.status} onValueChange={v => update("status", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                  <SelectItem value="Terminated">Terminated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">EMAIL</Label>
              <Input placeholder="email@cedallion.energy" value={form.email} onChange={e => update("email", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono">HIRE DATE</Label>
              <Input type="date" value={form.hire_date} onChange={e => update("hire_date", e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-mono">NOTES</Label>
            <Textarea placeholder="Additional notes..." value={form.notes} onChange={e => update("notes", e.target.value)} className="h-20" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground">
              {saving ? "Saving..." : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
