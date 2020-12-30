package glitterFrameWork.util


import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException
import java.nio.file.Files
import java.nio.file.Paths
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

object ZipUtil{
     fun zipFile(filePath: String) {
        try {
            val file = File(filePath)
            val zipFileName: String = file.name +(".zip")
            val fos = FileOutputStream(zipFileName)
            val zos = ZipOutputStream(fos)
            zos.putNextEntry(ZipEntry(file.name))
            val bytes: ByteArray = Files.readAllBytes(Paths.get(filePath))
            zos.write(bytes, 0, bytes.size)
            zos.closeEntry()
            zos.close()
        } catch (ex: FileNotFoundException) {
            System.err.format("The file %s does not exist", filePath)
        } catch (ex: IOException) {
            System.err.println("I/O error: $ex")
        }
    }
    var UnZip=false
    fun unzip(rout:String,version:String){
        if(UnZip){return}
        UnZip =true
        val sourceDir = Paths.get("$rout/appData")
        try {
            val zipFileName = "$rout/VersionHistory/$version.zip"
            ZipDir.zos = ZipOutputStream(FileOutputStream(zipFileName))
            Files.walkFileTree(sourceDir, ZipDir(sourceDir))
            ZipDir.zos.close()
        } catch (ex: IOException) {
            System.err.println("I/O Error: $ex")
        }
        UnZip =false
    }
}

