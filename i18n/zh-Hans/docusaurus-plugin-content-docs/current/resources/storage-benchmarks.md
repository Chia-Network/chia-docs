---
title: Storage Benchmarks
slug: /storage-benchmarks
---

:::note Notes

To have reproducible results the aim should be to limit caching effects. For that:

- Test data should be forced to storage and larger than flash drive's internal caches
- Block caches should be emptied between tests

:::

# [FIO](https://fio.readthedocs.io/en/latest/fio_doc.html)

`sudo apt update`
`sudo apt install fio`

Save this file as a job file called "chia.fio" or whatever you want, and change filename to the path of the drive or RAID volume that you want to test

```
[global]
bs=128K
iodepth=256
direct=1
ioengine=libaio
group_reporting
time_based
name=chia
log_avg_msec=1000
bwavgtime=1000
filename=/<yourRAID>/fiotest.tmp
size=100G

[rd_qd_256_128k_1w]
stonewall
bs=128k
iodepth=256
numjobs=1
rw=read
runtime=60
write_bw_log=seq_read_bw.log

[wr_qd_256_128k_1w]
stonewall
bs=128k
iodepth=256
numjobs=1
rw=write
runtime=60
write_bw_log=seq_write_bw.log
```

run `sudo fio chia.fio`

# [IOzone](http://www.iozone.org/)

This assumes RHEL stack Linux.

## Install from sources

```
sudo yum update -y
sudo yum groupinstall "Development Tools" -y
cd /opt
wget http://www.iozone.org/src/current/iozone3_490.tar
tar -xvf iozone3_490.tar
cd iozone3_490/src/current
make linux-AMD64
```

## Run single threaded

- Assume the test drive or volume is mounted as **/chia/scratch/disk01**
- -i 0=write/rewrite
- -i 1=read/re-read
- -i 2=random-read/write
- -i 8=random\_mix
- -e  Include flush (fsync,fflush) in the timing calculations
- -r #  record size in Kb
- -s #  file size in GB
- -U  Mount point to remount between tests, this option will clear the block caches between tests. For this to work, mounting of the disk/volume needs to be configured in /etc/fstab.

```
/opt/iozone3_490/src/current/iozone -e -r 256 -s 32G -i 0 -i 1 -i 2 -i 8 -f /chia/scratch/disk01/tfile -U /chia/scratch/disk01
```

## Run multi threaded

- Assume the test drive or volume is mounted as **/chia/scratch/disk01**
- -I Use DIRECT I/O for all file operations. Tells the filesystem that all operations are to bypass the buffer cache and go directly to disk. This also will use VX\_DIRECT on VxFS, and O\_DIRECT on Linux, and directio() on Solaris.
