// StudentMaterialsPage.jsx
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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Search, FileText, BookOpen } from "lucide-react";
import { useStudentMaterialsStore } from "../../zustand/student/learningUnits";

export function StudentMaterialsPage() {
  const {
    searchTerm,
    selectedCourse,
    selectedType,
    downloadedMaterials,
    setSearchTerm,
    setSelectedCourse,
    setSelectedType,
    addDownloadedMaterial,
    getFilteredMaterials,
  } = useStudentMaterialsStore();

  const filteredMaterials = getFilteredMaterials();

  const handleMaterialClick = (materialId, downloadUrl) => {
    if (downloadedMaterials.includes(materialId)) {
      alert("You've already downloaded this material. Downloading again...");
    } else {
      addDownloadedMaterial(materialId);
    }
    
    // Trigger download (in real app, replace with actual download logic)
    console.log(`Downloading material ${materialId}`);
    window.location.href = downloadUrl;
  };

  // Get unique courses for dropdown
  const courses = ["All Courses", ...new Set(filteredMaterials.map(m => m.course))];
  const types = ["All Types", "Lecture", "Assignment"];

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
              {courses.map(course => (
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
              {types.map(type => (
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
          <CardHeader>
            <CardTitle>Available Materials</CardTitle>
          </CardHeader>
          <CardContent>
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
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material) => (
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No materials found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}