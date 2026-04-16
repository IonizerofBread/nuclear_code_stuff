import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { format } from "date-fns";

const statusColors = {
  Active: "bg-green-500/10 text-green-600 border-green-500/20",
  "On Leave": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  Suspended: "bg-red-500/10 text-red-600 border-red-500/20",
  Terminated: "bg-muted text-muted-foreground border-border",
};

const clearanceColors = {
  "Level 1 - Public": "bg-secondary text-secondary-foreground",
  "Level 2 - Internal": "bg-blue-500/10 text-blue-600",
  "Level 3 - Confidential": "bg-primary/10 text-primary",
  "Level 4 - Secret": "bg-orange-500/10 text-orange-600",
  "Level 5 - Top Secret": "bg-red-500/10 text-red-600",
};

export default function EmployeeTable({ employees, isLoading }) {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = employees.filter(emp => {
    const matchSearch = !search ||
      emp.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      emp.employee_id?.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || emp.department === deptFilter;
    const matchStatus = statusFilter === "all" || emp.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))];

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-3">
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
                <SelectItem value="Terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-mono text-xs">ID</TableHead>
              <TableHead className="font-mono text-xs">NAME</TableHead>
              <TableHead className="font-mono text-xs">DEPARTMENT</TableHead>
              <TableHead className="font-mono text-xs">ROLE</TableHead>
              <TableHead className="font-mono text-xs">CLEARANCE</TableHead>
              <TableHead className="font-mono text-xs">STATUS</TableHead>
              <TableHead className="font-mono text-xs">HIRE DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  {Array(7).fill(0).map((_, j) => (
                    <TableCell key={j}><div className="h-4 bg-muted rounded w-20" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  No employees found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(emp => (
                <TableRow key={emp.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs text-primary font-semibold">{emp.employee_id}</TableCell>
                  <TableCell className="font-semibold">{emp.full_name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{emp.department}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{emp.role_title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-[10px] font-mono ${clearanceColors[emp.clearance_level] || ""}`}>
                      {emp.clearance_level?.replace("Level ", "L")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[emp.status] || ""}`}>
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">
                    {emp.hire_date ? format(new Date(emp.hire_date), "MMM d, yyyy") : "—"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-3 border-t border-border bg-muted/30">
        <p className="text-xs font-mono text-muted-foreground">
          SHOWING {filtered.length} OF {employees.length} RECORDS
        </p>
      </div>
    </div>
  );
}
