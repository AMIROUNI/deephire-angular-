import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobPosting } from '../../../models';
import { JobPostingService } from '../../../services/job-posting.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css'],
  standalone: false
})
export class JobEditComponent implements OnInit {
  formJobEdit: FormGroup;
  editMode = false;
  selectedJob: JobPosting | null = null;

  // Popup state
  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  popupIsSuccess = false;
  popupRedirectPath: string | null = null;
  showCancelButton = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public jobService: JobPostingService
  ) {
    this.formJobEdit = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      location: ['', [Validators.required]],
      datePosted: ['']
    });
  }

  ngOnInit(): void {
    this.loadJobs();

    // Récupérer les données de l'URL (matrix params)
    const params = this.route.snapshot.params;

    this.selectedJob = {
      title: decodeURIComponent(params['title'] || ''),
      description: decodeURIComponent(params['description'] || ''),
      requirements: decodeURIComponent(params['requirements'] || ''),
      location: decodeURIComponent(params['location'] || ''),
      datePosted: decodeURIComponent(params['datePosted'] || '')
    };

    this.formJobEdit.patchValue(this.selectedJob);
    this.editMode = true;
  }

  loadJobs(): void {
    this.jobService.getJobPostings().subscribe({
      next: (jobs) => {
        this.jobService.jobPostings = jobs;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des jobs :', err);
      }
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.selectedJob = null;
    this.formJobEdit.reset();
  }

  isInvalidAndTouchedOrDirty(control: any): boolean {
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit(): void {
    if (this.formJobEdit.valid && this.selectedJob) {
      const updatedJob = { ...this.formJobEdit.value };

      const updateWrapper = {
        original: this.selectedJob,
        updated: updatedJob
      };

      console.log('updatedJob:', updatedJob);

      this.jobService.updateJob(updateWrapper).subscribe({
        next: () => {
          this.showSuccessPopup();
          this.loadJobs();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour :', err);
          this.showErrorPopup("Erreur lors de la mise à jour.");
        }
      });
    } else {
      this.formJobEdit.markAllAsTouched();
    }
  }

  showSuccessPopup(): void {
    this.popupTitle = 'Mise à jour réussie';
    this.popupMessage = 'Le job a été mis à jour avec succès.';
    this.popupIsSuccess = true;
    this.popupRedirectPath = '/manage-jobs';
    this.showCancelButton = false;
    this.showPopup = true;
  }

  showErrorPopup(message: string): void {
    this.popupTitle = 'Erreur';
    this.popupMessage = message;
    this.popupIsSuccess = false;
    this.popupRedirectPath = null;
    this.showCancelButton = true;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
