import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button"; // Make sure this import path is correct
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, FileText, BookOpen } from "lucide-react";

export function StudentMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedType, setSelectedType] = useState("All Types");
  const [downloadedMaterials, setDownloadedMaterials] = useState([]);

  // Sample data
  const studyMaterials = [
    {
      id: "1",
      title: "Introduction to React",
      type: "lecture",
      course: "Web Development",
      uploadDate: "2023-10-15",
      downloadUrl: "#",
    },
    {
      id: "2",
      title: "Assignment 1: Components",
      type: "assignment",
      course: "Web Development",
      uploadDate: "2023-10-18",
      downloadUrl: "#",
    },
    {
      id: "3",
      title: "Advanced State Management",
      type: "lecture",
      course: "Advanced React",
      uploadDate: "2023-10-20",
      downloadUrl: "#",
    },
  ];

  // Filter materials
  const filteredMaterials = studyMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         material.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === "All Courses" || material.course === selectedCourse;
    const matchesType = selectedType === "All Types" || 
                       material.type.toLowerCase() === selectedType.toLowerCase();
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleMaterialClick = (materialId, downloadUrl) => {
    if (downloadedMaterials.includes(materialId)) {
      alert("You've already downloaded this material. Downloading again...");
    } else {
      setDownloadedMaterials([...downloadedMaterials, materialId]);
    }
    
    // Trigger download (in real app, replace with actual download logic)
    console.log(`Downloading material ${materialId}`);
    window.location.href = downloadUrl;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                {selectedCourse} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All Courses", ...new Set(studyMaterials.map(m => m.course))].map(course => (
                <DropdownMenuItem 
                  key={course} 
                  onClick={() => setSelectedCourse(course)}
                >
                  {course}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                {selectedType} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["All Types", "Lecture", "Assignment"].map(type => (
                <DropdownMenuItem 
                  key={type} 
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Uploaded</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMaterials.map((material) => (
                <TableRow 
                  key={material.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleMaterialClick(material.id, material.downloadUrl)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {material.type === "lecture" && <FileText className="mr-2 h-4 w-4" />}
                      {material.type === "assignment" && <BookOpen className="mr-2 h-4 w-4" />}
                      <span className={downloadedMaterials.includes(material.id) ? "text-blue-600" : ""}>
                        {material.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{material.course}</TableCell>
                  <TableCell className="capitalize">{material.type}</TableCell>
                  <TableCell>{material.uploadDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}