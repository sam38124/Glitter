package glitterFrameWork.util

import java.io.FileOutputStream
import java.io.IOException
import java.nio.file.*
import java.nio.file.attribute.BasicFileAttributes
import java.util.zip.ZipEntry
import java.util.zip.ZipOutputStream

/**
 * This Java program demonstrates how to compress a directory in ZIP format.
 *
 * @author www.codejava.net
 */
class ZipDir(private val sourceDir: Path) : SimpleFileVisitor<Path?>() {
    override fun visitFile(file: Path?,
                           attributes: BasicFileAttributes): FileVisitResult {
        try {
            val targetFile = sourceDir.relativize(file)
            zos!!.putNextEntry(ZipEntry(targetFile.toString()))
            val bytes = Files.readAllBytes(file)
            zos!!.write(bytes, 0, bytes.size)
            zos!!.closeEntry()
        } catch (ex: IOException) {
            System.err.println(ex)
        }
        return FileVisitResult.CONTINUE
    }

    companion object {
        lateinit var zos: ZipOutputStream

        @JvmStatic
        fun main(args: Array<String>) {
            val dirPath = args[0]
            val sourceDir = Paths.get(dirPath)
            try {
                val zipFileName = "$dirPath.zip"
                zos = ZipOutputStream(FileOutputStream(zipFileName))
                Files.walkFileTree(sourceDir, ZipDir(sourceDir))
                zos!!.close()
            } catch (ex: IOException) {
                System.err.println("I/O Error: $ex")
            }
        }
    }

}