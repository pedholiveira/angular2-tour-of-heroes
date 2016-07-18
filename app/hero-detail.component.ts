import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
	selector: 'my-hero-detail', 
	templateUrl: 'app/hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit, OnDestroy {

	hero: Hero;
	sub: any;

	constructor(private heroService: HeroService, private route: ActivatedRoute) {
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.loadHero(+params['id']);
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	goBack() {
		window.history.back();
	}

	private loadHero(id: number) {
		this.heroService.getHero(id).then(hero => this.hero = hero);
	}
}
